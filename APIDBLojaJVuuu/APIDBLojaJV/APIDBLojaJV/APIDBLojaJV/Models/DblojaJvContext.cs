using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace APIDBLojaJV.Models;

public partial class DblojaJvContext : DbContext
{
    public DblojaJvContext()
    {
    }

    public DblojaJvContext(DbContextOptions<DblojaJvContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.IdC).HasName("PK__cliente__9DB7D2F6FFAD4C89");

            entity.ToTable("cliente");

            entity.Property(e => e.IdC).HasColumnName("id_c");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Nome)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("nome");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.IdP).HasName("PK__pedidos__9DB7D2E5093CCF7B");

            entity.ToTable("pedidos");

            entity.Property(e => e.IdP).HasColumnName("id_p");
            entity.Property(e => e.Descricao)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("descricao");
            entity.Property(e => e.IdC).HasColumnName("id_c");
            entity.Property(e => e.Preco)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("preco");

            entity.HasOne(d => d.IdCNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.IdC)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__pedidos__id_c__38996AB5");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
