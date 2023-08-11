using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Infrastructure.IdentitySeeder;
using Infrastructure.StoreContextSeeder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StoreContextcs>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddDbContext<AppIdentityDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("Identity"));
});
builder.Services.AddIdentityCore<AppUser>(opt =>
{
    
})
    .AddEntityFrameworkStores<AppIdentityDbContext>()
    .AddSignInManager<SignInManager<AppUser>>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddSingleton<IConnectionMultiplexer>( c =>
{
    var option = builder.Configuration.GetConnectionString("Redis");
    return ConnectionMultiplexer.Connect(option);
});
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CORS", nxt =>
    {
    nxt.WithOrigins("https://localhost:4200").AllowAnyHeader().AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CORS");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContextcs>();
var Identitycontext = services.GetRequiredService<AppIdentityDbContext>();
var usermanager = services.GetRequiredService<UserManager<AppUser>>();

var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await Identitycontext.Database.MigrateAsync();
    await ContextSeeder.seed(context);
    await AppIdentityDbContextSeeder.seedUser(usermanager);

}
catch (Exception ex)
{
    logger.LogError(ex, "An error ocured while database migration");
}
app.Run();
