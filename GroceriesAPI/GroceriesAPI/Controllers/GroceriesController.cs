using Bussiness_Logic_Layer.BDC;
using Data_Access_Layer.repository;
using GroceriesAPI.Data;
using GroceriesAPI.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroceriesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceriesController : ControllerBase
    {
        public readonly DataContext _context;
        public readonly Igroceries _groceries;


        public GroceriesController(DataContext context ,Igroceries igroceries)
        {
            _context = context;
            _groceries = igroceries;
        }
        
        
        [HttpGet]
        public async Task<IActionResult> getGroceries()
        {
            //  var grocerie = await _context.groceries.ToListAsync();
            var grocerie = await _groceries.GetGroceries();

            return Ok(grocerie);
        }

        [HttpPost("addtoorders")]
        public async Task<IActionResult> addToOrders(Orders obj)
        {

            /* await _context.orders.AddAsync(obj);
             await _context.SaveChangesAsync();*/
            await _groceries.AddToOrders(obj);
            return Ok(obj);
        }

        [HttpPost("addtocart")]
        public async Task<IActionResult> addToCart(Cart obj)
        {

            /*await _context.cart.AddAsync(obj);
            await _context.SaveChangesAsync();*/
            await _groceries.AddToCart(obj);
            return Ok(obj);
        }

        [HttpGet("getcart")]
       
        public async Task<IActionResult> getFromCart()
        {

            //  var data = await _context.cart.ToListAsync();
            var data = await _groceries.GetFromCart();
            return Ok(data);
        }

        [HttpGet("getorders")]
        public async Task<IActionResult> getorders()
        {

            //var data = await _context.orders.ToListAsync();
            var data = await _groceries.getorders();
            return Ok(data);
        }

        [HttpGet("getComments/{productId}")]
        public async Task<ActionResult<List<Comments>>> getComments(int productId)
        {

            //var results = await _context.comments.Where(x => x.ProductId == productId).ToListAsync();

            var results = await _groceries.getComments(productId);
            if(results == null)
            {
                return BadRequest();
            }
            return results ;
        }





        [HttpGet("getorderdata/{username}")]
        public async Task<IActionResult> getordersdata(string username)
        {

            // var data = await _context.orders.Where(x => x.username==username).ToListAsync();
            var data = await _groceries.getordersdata(username);
            return Ok(data);
        }


        [HttpPut("editCartProduct")]
       
        public async Task<IActionResult> EditCartProduct(Cart obj)
        {
            
            await _groceries.EditCartProduct(obj);
            await _context.SaveChangesAsync();
            return Ok(await _context.cart.ToArrayAsync());

        }

        [HttpDelete("CartProduct/{id}")]
        public async Task<ActionResult<List<Cart>>> CartDelete(int id)
        {
            
            await _groceries.CartDelete(id);
            await _context.SaveChangesAsync();
            return Ok(await _context.cart.ToListAsync());
        }
        [HttpPost("Comments")]
        public async Task<IActionResult> CreateComments(Comments obj)
        {
           
            var deleted = await _groceries.CreateComments(obj);
            return Ok(deleted);
        }

        [HttpPost]
        public async Task<IActionResult> createGroceries(Groceries obj)
        {


          
            var created = await _groceries.createGroceries(obj);
            return Ok(created);
        }

        [HttpGet("CartDataUser/{username}")]
        public async Task<ActionResult<List<Cart>>> GetFromCartUser(string username)
        {
            
            var rows = await _groceries.GetFromCartUser(username);
            return rows;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> getupdateGroceries(int id)
        {
           
            var dbdata = await _groceries.getupdateGroceries(id);
            if (dbdata == null)
                return NotFound();

            return Ok(dbdata);
        }
        
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> updateGroceries(int id,Groceries obj)
        {
           
            var updatedGrocery = await _groceries.updateGroceries(id, obj);
            if(updatedGrocery == null)
            {
                return NotFound();
            }
            return Ok(updatedGrocery);

        }


        
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> deleteGroceries(int id)
        {
            

            var dbdata = await _groceries.deleteGroceries(id);
            return Ok(dbdata);
        }


    }
}
