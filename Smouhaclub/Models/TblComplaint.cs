using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("Tbl_Complaints")]
public partial class TblComplaint
{
    [Key]
    public int ComplaintId { get; set; }

    [StringLength(150)]
    [Unicode(false)]
    public string? ComplaintEmail { get; set; }

    public DateOnly? ComplaintDate { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string? ComplaintTitle { get; set; }

    public string? ComplaintDescription { get; set; }
}
