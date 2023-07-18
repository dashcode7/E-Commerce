

using Core.Entities;
using Infrastructure.Data;
using System.Text.Json;

namespace Infrastructure.StoreContextSeeder
{
    public class ContextSeeder
    {
        public static async Task seed(StoreContextcs context)
        {
            if (!context.ProductBrand.Any())
            {
                var branddata = File.ReadAllText("../Infrastructure/SeedData/brands.json");
                var brand = JsonSerializer.Deserialize<List<ProductBrand>>(branddata);
                context.ProductBrand.AddRange(brand);
            }
            if (!context.ProductType.Any())
            {
                var branddata = File.ReadAllText("../Infrastructure/SeedData/types.json");
                var brand = JsonSerializer.Deserialize<List<ProductType>>(branddata);
                context.ProductType.AddRange(brand);
            }
            if (!context.Products.Any())
            {
                var branddata = File.ReadAllText("../Infrastructure/SeedData/products.json");
                var brand = JsonSerializer.Deserialize<List<Product>>(branddata);
                context.Products.AddRange(brand);
            }
            if (context.ChangeTracker.HasChanges())
            {
                await context.SaveChangesAsync();
            }
        }
    }
}
