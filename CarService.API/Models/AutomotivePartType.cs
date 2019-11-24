using System.Collections.Generic;

namespace CarService.API.Models
{
    public class AutomotivePartType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
        
        public ICollection<AutomotivePart> AutomotiveParts { get; set; }
    }
}