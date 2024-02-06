using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("Tbl_Services")]
public partial class TblService
{
    [Key]
    [Column("ServiceID")]
    public int ServiceId { get; set; }

    [StringLength(255)]
    public string? ServiceName { get; set; }

    public string? ServiceDescription { get; set; }

    [StringLength(150)]
    [Unicode(false)]
    public string? ServicePhoto { get; set; }

    public bool? IsShowable { get; set; }
}
