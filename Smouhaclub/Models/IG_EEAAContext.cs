using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

public partial class IG_EEAAContext : DbContext
{
    public IG_EEAAContext()
    {
    }

    public IG_EEAAContext(DbContextOptions<IG_EEAAContext> options)
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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(SettingHelper.GetConnectionString());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblComplaint>(entity =>
        {
            entity.HasKey(e => e.ComplaintId).HasName("PK__Tbl_Comp__740D898F1BD012F4");
        });

        modelBuilder.Entity<TblMember>(entity =>
        {
            entity.HasKey(e => e.MemberId).HasName("PK__tbl_Memb__0CF04B18174E6DB0");
        });

        modelBuilder.Entity<TblMemberShip>(entity =>
        {
            entity.HasKey(e => e.ShipId).HasName("PK__tbl_Memb__CC873BC5664789C2");
        });

        modelBuilder.Entity<TblNews>(entity =>
        {
            entity.HasKey(e => e.NewsId).HasName("PK__Tbl_News__954EBDF342048B02");
        });

        modelBuilder.Entity<TblNewsGallery>(entity =>
        {
            entity.HasKey(e => e.NewGalleryId).HasName("PK__Tbl_News__95FF4A0A53094032");
        });

        modelBuilder.Entity<TblService>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__tbl_Serv__C51BB0EADBC12379");
        });

        modelBuilder.Entity<TblServiceGallery>(entity =>
        {
            entity.HasKey(e => e.ServicGalleryId).HasName("PK__tbl_Serv__E126BE28FE244AA2");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
