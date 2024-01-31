using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

public partial class SmouhaclubContext : DbContext
{
    public SmouhaclubContext()
    {
    }

    public SmouhaclubContext(DbContextOptions<SmouhaclubContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblComplaint> TblComplaints { get; set; }

    public virtual DbSet<TblMember> TblMembers { get; set; }

    public virtual DbSet<TblMemberShip> TblMemberShips { get; set; }

    public virtual DbSet<TblNews> TblNews { get; set; }

    public virtual DbSet<TblNewsGallery> TblNewsGalleries { get; set; }

    public virtual DbSet<TblService> TblServices { get; set; }

    public virtual DbSet<TblServiceGallery> TblServiceGalleries { get; set; }

    public virtual DbSet<TblUser> TblUsers { get; set; }
    public virtual DbSet<ContactU> ContactUs { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(SettingHelper.GetConnectionString());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("SQL_Latin1_General_CP1256_CI_AS");

        modelBuilder.Entity<TblComplaint>(entity =>
        {
            entity.HasKey(e => e.ComplaintId).HasName("PK__Tbl_Comp__740D898FD9051BA7");
        });

        modelBuilder.Entity<TblMember>(entity =>
        {
            entity.HasKey(e => e.MemberId).HasName("PK__tbl_Memb__0CF04B183C2ED80C");
        });

        modelBuilder.Entity<TblMemberShip>(entity =>
        {
            entity.HasKey(e => e.ShipId).HasName("PK__tbl_Memb__CC873BC5B1DA03BB");
        });

        modelBuilder.Entity<TblNews>(entity =>
        {
            entity.HasKey(e => e.NewsId).HasName("PK__Tbl_News__954EBDF3C0DBDF3D");
        });

        modelBuilder.Entity<TblNewsGallery>(entity =>
        {
            entity.HasKey(e => e.NewGalleryId).HasName("PK__Tbl_News__95FF4A0A8249F95A");
        });

        modelBuilder.Entity<TblService>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__tbl_Serv__C51BB0EA7BE11EEB");
        });

        modelBuilder.Entity<TblServiceGallery>(entity =>
        {
            entity.HasKey(e => e.ServicGalleryId).HasName("PK__ServiceG__E126BE28784F2748");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
