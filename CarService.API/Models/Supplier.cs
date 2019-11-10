using System.Collections.Generic;

namespace CarService.API.Models
{
    public class Supplier
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public ICollection<AutomotivePart> AutomotiveParts { get; set; }
    }
}