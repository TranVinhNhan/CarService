using System.Collections.Generic;
using System.Threading.Tasks;
using CarService.API.Models;

namespace CarService.API.Repositories
{
    public interface IGenericRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id); 
         Task<IEnumerable<AutomotivePart>> GetAllParts();
         Task<AutomotivePart> GetPart(int id);
         Task<IEnumerable<AutomotivePartType>> GetAllTypes();
         Task<IEnumerable<Supplier>> GetAllSuppliers();
         Task<AutomotivePartType> GetType(int id);
         Task<Supplier> GetSupplier(int id);
         Task<IEnumerable<Service>> GetAllServices();
         Task<Photo> GetPhoto(int id);
    }
}