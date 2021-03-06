using System.Collections.Generic;
using System.Threading.Tasks;
using CarService.API.Data;
using CarService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarService.API.Repositories
{
    public class GenericRepository : IGenericRepository
    {
        private readonly DataContext _context;
        public GenericRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users
            .Include(c => c.CarReceipts)
            .Include(u => u.ProductOrders)
            .ThenInclude(p => p.ProductOrderDetails)
            .FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(c => c.CarReceipts).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<AutomotivePart>> GetAllParts()
        {
            var parts = await _context.AutomotiveParts
                .Include(t => t.AutomotivePartType)
                .Include(s => s.Supplier)
                .Include(p => p.Photos)
                .ToListAsync();

            return parts;
        }

        public async Task<IEnumerable<AutomotivePartType>> GetAllTypes()
        {
            var types = await _context.AutomotivePartTypes.Include(p => p.AutomotiveParts).ToListAsync();

            return types;
        }

        public async Task<AutomotivePartType> GetType(int id)
        {
            var type = await _context.AutomotivePartTypes.Include(p => p.AutomotiveParts).FirstOrDefaultAsync(a => a.Id == id);

            return type;
        }

        public async Task<IEnumerable<Supplier>> GetAllSuppliers()
        {
            var sups = await _context.Suppliers.Include(p => p.AutomotiveParts).ToListAsync();

            return sups;
        }

        public async Task<Supplier> GetSupplier(int id)
        {
            var sup = await _context.Suppliers.Include(p => p.AutomotiveParts).FirstOrDefaultAsync(s => s.Id == id);

            return sup;
        }

        public async Task<IEnumerable<Service>> GetAllServices()
        {
            var services = await _context.Services
            .Include(c => c.CarReceipts)
            .Include(s => s.Photo)
            .ToListAsync();

            return services;
        }

        public async Task<AutomotivePart> GetPart(int id)
        {
            var part = await _context.AutomotiveParts
                .Include(t => t.AutomotivePartType)
                .Include(s => s.Supplier)
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(p => p.Id == id);

            return part;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<Service> GetService(int id)
        {
            var service = await _context.Services
                .Include(s => s.CarReceipts)
                .Include(s => s.Photo)
                .FirstOrDefaultAsync(s => s.Id == id);

            return service;
        }

        public async Task<IEnumerable<ProductOrder>> GetOrders()
        {
            var orders = await _context.ProductOrders.Include(o => o.User).Include(o => o.ProductOrderDetails).ToListAsync();

            return orders;
        }

        public async Task<ProductOrder> GetOrderByUser(int userId)
        {
            var order = await _context.ProductOrders.Include(o => o.User).Include(o => o.ProductOrderDetails).FirstOrDefaultAsync(o => o.User.Id == userId);

            return order;
        }

        public async Task<ProductOrder> GetOrderById(int orderId)
        {
            var order = await _context.ProductOrders.Include(o => o.User).Include(o => o.ProductOrderDetails).FirstOrDefaultAsync(o => o.Id == orderId);

            return order;
        }

        public async Task<CarReceipt> GetCarReceipt(int id)
        {
            var carReceipt = await _context.CarReceipts
            .Include(c => c.Service)
            .Include(c => c.User)
            .Include(c => c.RepairReceipt)
            .FirstOrDefaultAsync(c => c.Id == id);

            return carReceipt;
        }

        public async Task<IEnumerable<CarReceipt>> GetCarReceipts()
        {
            var carReceipts = await _context.CarReceipts
            .Include(c => c.Service)
            .Include(c => c.User)
            .Include(c => c.RepairReceipt)
            .ToListAsync();

            return carReceipts;
        }
    }
}