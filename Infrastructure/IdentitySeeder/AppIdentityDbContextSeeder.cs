using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.IdentitySeeder
{
    public class AppIdentityDbContextSeeder
    {
        public static async Task seedUser(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var seed = new AppUser
                {
                    DisplayName = "Kiran",
                    UserName = "kiran.ganesan",
                    Email = "kiran.ganesan@gmail.com",
                    Address = new Address
                {
                    FirstName="Kiran",
                    LastName="Ganesan",
                    City="Podnicherry",
                    Street="some st",
                    PinCode="777777"
                }
                };

                await userManager.CreateAsync(seed, "Pa$$w0rd");
            }

        }
    }
}
