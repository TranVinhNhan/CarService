namespace CarService.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public AutomotivePart AutomotivePart { get; set; }
        public int AutomotivePartId { get; set; }
    }
}