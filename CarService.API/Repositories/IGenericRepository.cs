using System.Collections.Generic;
using System.Threading.Tasks;
using CarService.API.Models;

namespace CarService.API.Repositories
{
    public interface IGenericRepository
    {
        // Generic
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         void Update<T>(T entity) where T: class;
         Task<bool> SaveAll();

         // User
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id); 

         // Automotive Part
         Task<IEnumerable<AutomotivePart>> GetAllParts();
         Task<AutomotivePart> GetPart(int id);

         // Type
         Task<IEnumerable<AutomotivePartType>> GetAllTypes();
         Task<AutomotivePartType> GetType(int id);

         // Supplier
         Task<IEnumerable<Supplier>> GetAllSuppliers();
         Task<Supplier> GetSupplier(int id);

         // Service
         Task<IEnumerable<Service>> GetAllServices();
         Task<Service> GetService(int id);

         // Photo
         Task<Photo> GetPhoto(int id);

         // Order
         Task<IEnumerable<ProductOrder>> GetOrders();
         Task<ProductOrder> GetOrderByUser(int userId);
    }
}