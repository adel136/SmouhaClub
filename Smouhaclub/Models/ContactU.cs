using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

public partial class ContactU
{
    [Key]
    [Column("Tbl_ContactUs")]
    public int ContactId { get; set; }

    [StringLength(50)]
    public string? FirstName { get; set; }

    [StringLength(50)]
    public string? LastName { get; set; }

    [StringLength(100)]
    public string? Email { get; set; }

    [StringLength(20)]
    public string? TitelMessage { get; set; }

    [StringLength(500)]
    public string? ContactSubject { get; set; }
}
