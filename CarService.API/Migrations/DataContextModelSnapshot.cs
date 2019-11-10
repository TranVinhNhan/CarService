﻿// <auto-generated />
using System;
using CarService.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CarService.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("CarService.API.Models.AutomotivePart", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AutomotivePartTypeId");

                    b.Property<double>("CurrentPrice");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("SupplierId");

                    b.HasKey("Id");

                    b.HasIndex("AutomotivePartTypeId");

                    b.HasIndex("SupplierId");

                    b.ToTable("AutomotiveParts");
                });

            modelBuilder.Entity("CarService.API.Models.AutomotivePartRepairReceipt", b =>
                {
                    b.Property<int>("AutomotivePartId");

                    b.Property<int>("RepairReceiptId");

                    b.Property<int?>("AutomotivePartId1");

                    b.Property<int>("Quantity");

                    b.Property<double>("Wage");

                    b.HasKey("AutomotivePartId", "RepairReceiptId");

                    b.HasIndex("AutomotivePartId1");

                    b.HasIndex("RepairReceiptId");

                    b.ToTable("AutomotivePartRepairReceipt");
                });

            modelBuilder.Entity("CarService.API.Models.AutomotivePartType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Brand");

                    b.Property<string>("CarModel");

                    b.Property<string>("TypeName");

                    b.HasKey("Id");

                    b.ToTable("AutomotivePartTypes");
                });

            modelBuilder.Entity("CarService.API.Models.CarReceipt", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Brand");

                    b.Property<string>("CarModel");

                    b.Property<DateTime>("DayReceived");

                    b.Property<string>("LicensePlateNumber");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("CarReceipts");
                });

            modelBuilder.Entity("CarService.API.Models.CarReceiptService", b =>
                {
                    b.Property<int>("CarReceiptId");

                    b.Property<int>("ServiceId");

                    b.HasKey("CarReceiptId", "ServiceId");

                    b.HasIndex("ServiceId");

                    b.ToTable("CarReceiptService");
                });

            modelBuilder.Entity("CarService.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AutomotivePartId");

                    b.Property<string>("PublicId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("AutomotivePartId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("CarService.API.Models.RepairReceipt", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CarReceiptId");

                    b.Property<string>("Description");

                    b.Property<DateTime>("RepairedDay");

                    b.HasKey("Id");

                    b.HasIndex("CarReceiptId")
                        .IsUnique();

                    b.ToTable("RepairReceipt");
                });

            modelBuilder.Entity("CarService.API.Models.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<double>("Price");

                    b.HasKey("Id");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("CarService.API.Models.Supplier", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("Contact");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Suppliers");
                });

            modelBuilder.Entity("CarService.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<DateTime>("Created");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender");

                    b.Property<DateTime>("LastActive");

                    b.Property<string>("LastName");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("PaymentCardNumber");

                    b.Property<string>("PhoneNumber");

                    b.Property<string>("Role");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CarService.API.Models.AutomotivePart", b =>
                {
                    b.HasOne("CarService.API.Models.AutomotivePartType", "AutomotivePartType")
                        .WithMany("AutomotiveParts")
                        .HasForeignKey("AutomotivePartTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CarService.API.Models.Supplier", "Supplier")
                        .WithMany("AutomotiveParts")
                        .HasForeignKey("SupplierId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarService.API.Models.AutomotivePartRepairReceipt", b =>
                {
                    b.HasOne("CarService.API.Models.AutomotivePart", "AutomotivePart")
                        .WithMany("AutomotivePartRepairReceipts")
                        .HasForeignKey("AutomotivePartId1");

                    b.HasOne("CarService.API.Models.RepairReceipt", "RepairReceipt")
                        .WithMany("AutomotivePartRepairReceipts")
                        .HasForeignKey("RepairReceiptId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarService.API.Models.CarReceipt", b =>
                {
                    b.HasOne("CarService.API.Models.User", "User")
                        .WithMany("CarReceipts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarService.API.Models.CarReceiptService", b =>
                {
                    b.HasOne("CarService.API.Models.CarReceipt", "CarReceipt")
                        .WithMany("CarReceiptServices")
                        .HasForeignKey("CarReceiptId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CarService.API.Models.Service", "Service")
                        .WithMany("CarReceiptServices")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarService.API.Models.Photo", b =>
                {
                    b.HasOne("CarService.API.Models.AutomotivePart", "AutomotivePart")
                        .WithMany("Photos")
                        .HasForeignKey("AutomotivePartId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarService.API.Models.RepairReceipt", b =>
                {
                    b.HasOne("CarService.API.Models.CarReceipt", "CarReceipt")
                        .WithOne("RepairReceipt")
                        .HasForeignKey("CarService.API.Models.RepairReceipt", "CarReceiptId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
