using CarService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarService.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<AutomotivePart> AutomotiveParts { get; set; }
        public DbSet<AutomotivePartType> AutomotivePartTypes { get; set; }
        public DbSet<CarReceipt> CarReceipts { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<RepairReceipt> RepairReceipt { get; set; }
        public DbSet<AutomotivePartRepairReceipt> AutomotivePartRepairReceipt { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }
        public DbSet<ProductOrderDetail> ProductOrderDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AutomotivePartRepairReceipt>()
                .HasKey(c => new { c.AutomotivePartId, c.RepairReceiptId });

            modelBuilder.Entity<CarReceipt>()
            .HasOne(c => c.RepairReceipt)
            .WithOne(r => r.CarReceipt)
            .HasForeignKey<RepairReceipt>(r => r.CarReceiptId);

            modelBuilder.Entity<Service>()
            .HasOne(s => s.Photo)
            .WithOne(p => p.Service)
            .HasForeignKey<Photo>(p => p.ServiceId);
        }
    }
}