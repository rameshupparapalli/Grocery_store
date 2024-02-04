using Data_Access_Layer.repository;
using GroceriesAPI;
using GroceriesAPI.models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness_Logic_Layer.BDC
{
   public  class groceries : Igroceries
    {
        public readonly Igroceryrepository _repository;
     
        public groceries(Igroceryrepository repository)
        {
            _repository = repository;
        }

        public async Task AddToCart(Cart obj)
        {
            await _repository.AddToCart(obj);
        }

        public async Task AddToOrders(Orders obj)
        {
            await  _repository.AddToOrders(obj);
        }

        public async Task<Cart> CartDelete(int id)
        {
            return await _repository.CartDelete(id);
        }

        public async Task<Comments> CreateComments(Comments obj)
        {
            return await _repository.CreateComments(obj);
        }

        public async Task<Groceries> createGroceries(Groceries obj)
        {
            return await _repository.createGroceries(obj);
        }

        public async Task<Groceries> deleteGroceries(int id)
        {
            return await _repository.deleteGroceries(id);
        }

        public async Task<Cart> EditCartProduct(Cart obj)
        {
            return await _repository.EditCartProduct(obj);
        }

        public Task<List<Comments>> getComments(int productId)
        {
            return _repository.getComments(productId);
        }

        public Task<List<Cart>> GetFromCart()
        {
            return _repository.GetFromCart();
        }

        public async Task<List<Cart>> GetFromCartUser(string username)
        {
            return await _repository.GetFromCartUser(username);
        }

        public Task<List<Groceries>> GetGroceries()
        {
            return _repository.GetGroceries();
        }

        public Task<List<Orders>> getorders()
        {
            return _repository.getorders();
        }

        public Task<List<Orders>> getordersdata(string username)
        {
            return _repository.getordersdata(username);
        }

        public async Task<Groceries> getupdateGroceries(int id)
        {
            return await _repository.getupdateGroceries(id);
        }

        public async Task<Groceries> updateGroceries(int id, Groceries obj)
        {
            return await _repository.updateGroceries(id, obj);
        }
    }
}
