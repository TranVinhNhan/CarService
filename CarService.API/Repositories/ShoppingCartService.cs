using System;
using System.Collections.Generic;
using CarService.API.Data;
using CarService.API.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CarService.API.Repositories
{
    public class ShoppingCartService : IShoppingCartService
    {
        public string Id { get; set; }
        public IEnumerable<ShoppingCartItem> ShoppingCartItems { get; set; }
        private readonly DataContext _context;
        public ShoppingCartService(DataContext context)
        {
            _context = context;
        }

        public static ShoppingCartService GetCart(IServiceProvider services)
        {
            // var httpContext = service.GetRequiredService<IHttpContextAccessor>()?.HttpContext;
            // var context = service.GetRequiredService<DataContext>();
            // var request = httpContext.Request;
            // var response = httpContext.Response;

            // var cartId = request.Cookies["CartId-cookie"] ?? Guid.NewGuid().ToString();

            // response.Cookies.Append("CartId-cookie", cartId, new CookieOptions
            // {
            //     Expires = DateTime.Now.AddMonths(2)
            // });

            // return new ShoppingCartService(context)
            // {
            //     Id = cartId
            // };

            ISession session = services.GetRequiredService<IHttpContextAccessor>()?.HttpContext.Session;
            var context = services.GetService<DataContext>();
            string cartId = session.GetString("CartId") ?? Guid.NewGuid().ToString();
            session.SetString("CartId", cartId);
            return new ShoppingCartService(context) { Id = cartId };
        }

        public async Task<int> AddToCartAsync(AutomotivePart part)
        {
            return await AddOrRemoveCartAsync(part, 1);
        }

        public async Task<int> RemoveFromCartAsync(AutomotivePart part)
        {
            return await AddOrRemoveCartAsync(part, -1);
        }
        private async Task<int> AddOrRemoveCartAsync(AutomotivePart part, int qty)
        {
            var shoppingCartItem = _context.ShoppingCartItems
                .SingleOrDefault(s => s.AutomotivePartId == part.Id && s.ShoppingCartId == Id);

            if (shoppingCartItem == null)
            {
                shoppingCartItem = new ShoppingCartItem
                {
                    ShoppingCartId = Id,
                    AutomotivePart = part,
                    Quantity = 0
                };
                _context.ShoppingCartItems.Add(shoppingCartItem);
            }
            shoppingCartItem.Quantity += qty;

            if (shoppingCartItem.Quantity <= 0)
            {
                shoppingCartItem.Quantity = 0;
                _context.ShoppingCartItems.Remove(shoppingCartItem);
            }
            await _context.SaveChangesAsync();
            ShoppingCartItems = null;
            return await Task.FromResult(shoppingCartItem.Quantity);
        }
        public async Task ClearCartAsync()
        {
            var shoppingCartItems = _context
                .ShoppingCartItems
                .Where(s => s.ShoppingCartId == Id);

            _context.ShoppingCartItems.RemoveRange(shoppingCartItems);

            ShoppingCartItems = null; //reset
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ShoppingCartItem>> GetShoppingCartItemsAsync()
        {
            ShoppingCartItems = ShoppingCartItems ?? await _context.ShoppingCartItems
                                                            .Where(s => s.ShoppingCartId == Id)
                                                            .Include(part => part.AutomotivePart).ThenInclude(photo => photo.Photos) 
                                                            .Include(part => part.AutomotivePart).ThenInclude(sup => sup.Supplier)
                                                            .Include(part => part.AutomotivePart).ThenInclude(type => type.AutomotivePartType)
                                                            .ToListAsync();
            return ShoppingCartItems;
        }

        public async Task<(int ItemCount, double TotalAmount)> GetCartCountAndTotalAmountAsync()
        {
            var subTotal = ShoppingCartItems?.Select(p => p.AutomotivePart.CurrentPrice * p.Quantity) ??
            await _context.ShoppingCartItems.Where(s => s.ShoppingCartId == Id).Select(p => p.AutomotivePart.CurrentPrice * p.Quantity).ToListAsync();

            return (subTotal.Count(), subTotal.Sum());
        }
    }
}