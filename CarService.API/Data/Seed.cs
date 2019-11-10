using System.Collections.Generic;
using System.Linq;
using CarService.API.Models;
using Newtonsoft.Json;

namespace CarService.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            if (!_context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();

                    _context.Users.Add(user);
                }
                _context.SaveChanges();
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public void SeedPart()
        {
            if (!_context.AutomotiveParts.Any())
            {
                var typePart = System.IO.File.ReadAllText("Data/PartSeedData.json");
                var parts = JsonConvert.DeserializeObject<List<AutomotivePart>>(typePart);
                foreach (var part in parts)
                {
                    _context.AutomotiveParts.Add(part);
                }
                _context.SaveChanges();
            }
        }

        public void SeedType()
        {
            if (!_context.AutomotivePartTypes.Any())
            {
                var typeData = System.IO.File.ReadAllText("Data/TypeSeedData.json");
                var types = JsonConvert.DeserializeObject<List<AutomotivePartType>>(typeData);
                foreach (var type in types)
                {
                    _context.AutomotivePartTypes.Add(type);
                }
                _context.SaveChanges();
            }
        }

        public void SeedSupplier()
        {
            if (!_context.Suppliers.Any())
            {
                var supData = System.IO.File.ReadAllText("Data/SupplierSeedData.json");
                var sups = JsonConvert.DeserializeObject<List<Supplier>>(supData);
                foreach (var sup in sups)
                {
                    _context.Suppliers.Add(sup);
                }
                _context.SaveChanges();
            }
        }
        public void SeedService()
        {
            if (!_context.Services.Any())
            {
                var servicesData = System.IO.File.ReadAllText("Data/ServiceSeedData.json");
                var services = JsonConvert.DeserializeObject<List<Service>>(servicesData);
                foreach (var service in services)
                {
                    _context.Services.Add(service);
                }
                _context.SaveChanges();
            }
        }
    }
}