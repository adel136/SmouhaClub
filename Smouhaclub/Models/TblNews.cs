using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("Tbl_News")]
public partial class TblNews
{
    [Key]
    public int NewsId { get; set; }

    [StringLength(2000)]
    public string? NewsTitle { get; set; }

    public string? NewsContent { get; set; }

    [StringLength(150)]
    [Unicode(false)]
    public string? NewsPhoto { get; set; }

    public DateOnly? NewsDate { get; set; }

    public bool? IsShowable { get; set; }
}
