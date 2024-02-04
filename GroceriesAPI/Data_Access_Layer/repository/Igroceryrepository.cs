using GroceriesAPI;
using GroceriesAPI.models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.repository
{
   public interface Igroceryrepository
    {
        Task<List<Groceries>> GetGroceries();
        Task AddToOrders(Orders obj);
        Task AddToCart(Cart obj);
        Task<List<Cart>> GetFromCart();
        Task<List<Orders>> getorders();
        Task<List<Comments>> getComments(int productId);
        Task<List<Orders>> getordersdata(string username);
        Task<Cart> EditCartProduct(Cart obj);
        Task<Cart> CartDelete(int id);
        Task<Comments> CreateComments(Comments obj);

        Task<Groceries> createGroceries(Groceries obj);
        Task<List<Cart>> GetFromCartUser(string username);

        Task<Groceries> getupdateGroceries(int id);
        Task<Groceries> updateGroceries(int id, Groceries obj);
        Task<Groceries> deleteGroceries(int id);


    }
}
