using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;


namespace Smouhaclub.Models
{
    [Table("tbl_Users")]
    public partial class TblUsers
    {
    [Key]
    [Column("UserId")]
    public int UserId { get; set; }

    [StringLength(250)]
    public string? UserFullName { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? UserName { get; set; }

    [StringLength(500)]
    public string? UserPassword { get; set; }

    [StringLength(500)]
    public string? UserEmail { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? UserPhoto { get; set; }

    public bool? IsActive { get; set; }
        
    }
}