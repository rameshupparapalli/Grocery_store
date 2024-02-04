
using GroceriesAPI.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceriesAPI.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Groceries> groceries => Set<Groceries>();
        public DbSet<Users> users { get; set; }

        public DbSet<Cart> cart { get; set; }
        public DbSet<Orders> orders { get; set; }
        public DbSet<Comments> comments { get; set; }
    }
}
