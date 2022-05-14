using Microsoft.EntityFrameworkCore;
using System;
using WebApp.Domain;

namespace WebApp.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
    }
}
