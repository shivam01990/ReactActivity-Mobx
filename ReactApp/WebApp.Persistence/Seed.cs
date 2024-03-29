﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Domain;

namespace WebApp.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser(){ DisplayName="Bob", UserName="bob", Email="bob@test.com"},
                    new AppUser(){ DisplayName="Tom", UserName="tom", Email="tom@test.com"},
                    new AppUser(){ DisplayName="Jane", UserName="jane", Email="jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Password@123");
                }

            }
           
            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Past Category1 ",
                    Date= DateTime.Now,
                    Description= "Some description Past Category1",
                },
                new Activity
                {
                    Title = "Past Category2 ",
                    Date= DateTime.Now,
                    Description= "Some description Past Category2",
                },
                new Activity
                {
                    Title = "Past Category3 ",
                    Date= DateTime.Now,
                    Description= "Some description Past Category3",
                },
                new Activity
                {
                    Title = "Past Category4 ",
                    Date= DateTime.Now,
                    Description= "Some description Past Category4",
                }
            };

            await context.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}
