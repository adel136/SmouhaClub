using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("Tbl_Users")]
public partial class TblUser
{
    [Key]
    public int UserId { get; set; }

    [StringLength(250)]
    public string UserFullName { get; set; } = null!;

    [StringLength(250)]
    [Unicode(false)]
    public string UserName { get; set; } = null!;

    [StringLength(500)]
    public string UserPassword { get; set; } = null!;

    [StringLength(250)]
    [Unicode(false)]
    public string? UserEmail { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? UserPhoto { get; set; }

    public bool IsActive { get; set; }
}
