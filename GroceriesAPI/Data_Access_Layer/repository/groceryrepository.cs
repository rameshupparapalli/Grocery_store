using GroceriesAPI;
using GroceriesAPI.Data;
using GroceriesAPI.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.repository
{
    public class groceryrepository : Igroceryrepository
    {
        public readonly DataContext _context;


        public groceryrepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddToCart(Cart obj)
        {
            await _context.cart.AddAsync(obj);
            await _context.SaveChangesAsync();

        }

        public async Task AddToOrders(Orders obj)
        {
            await _context.orders.AddAsync(obj);
            await _context.SaveChangesAsync();
        }

        public async Task<Cart> CartDelete(int id)
        {
             var delete = await _context.cart.FindAsync(id);
             if(delete!=null)
            {
                _context.cart.Remove(delete);
            }

            return delete;
              
        }

        public async Task<Comments> CreateComments(Comments obj)
        {
            await _context.comments.AddAsync(obj);
            await _context.SaveChangesAsync();
            return obj;
        }

        public async Task<Groceries> createGroceries(Groceries obj)
        {
            await _context.groceries.AddAsync(obj);
            await _context.SaveChangesAsync();
            return obj;
        }

        public async Task<Groceries> deleteGroceries(int id)
        {
            var dbdata = await _context.groceries.FindAsync(id);
            if (dbdata == null)
                return null;
            _context.groceries.Remove(dbdata);
            await _context.SaveChangesAsync();
            return dbdata;
        }

        public async Task<Cart> EditCartProduct(Cart obj)
        {
            var row = await _context.cart.FindAsync(obj.Id);
        if(row!=null)
            {
                row.Product = obj.Product;
                row.Description = obj.Description;
                row.price = obj.price;
                row.Quantity = obj.Quantity;

            }
            return row;
        
        }

        public Task<List<Comments>> getComments(int productId)
        {
            return _context.comments.Where(x => x.ProductId == productId).ToListAsync();
        }

        public Task<List<Cart>> GetFromCart()
        {
            return _context.cart.ToListAsync();
        }

        public async Task<List<Cart>> GetFromCartUser(string username)
        {
            var rows = await _context.cart.Where(x => x.username == username).ToListAsync();
            return rows;
        }

        public Task<List<Groceries>> GetGroceries()
        {
            return _context.groceries.ToListAsync();
        }

        public Task<List<Orders>> getorders()
        {
            return _context.orders.ToListAsync();
        }

        public Task<List<Orders>> getordersdata(string username)
        {
            return _context.orders.Where(x => x.username == username).ToListAsync();
        }

        public async Task<Groceries> getupdateGroceries(int id)
        {
            var data = await _context.groceries.FirstOrDefaultAsync(x => x.Id == id);
            return data;
        }

        public async Task<Groceries> updateGroceries(int id, Groceries obj)
        {
            var dbdata = await _context.groceries.FindAsync(id);
            if (dbdata == null)
                return null;
            dbdata.Product = obj.Product;
            dbdata.Description = obj.Description;
            dbdata.price = obj.price;
            dbdata.Image = obj.Image;
            dbdata.Category = obj.Category;
            dbdata.Quantity = obj.Quantity;
            dbdata.Discount = obj.Discount;
            dbdata.Weight = obj.Weight;


            await _context.SaveChangesAsync();
            return dbdata;
        }
    }
}

