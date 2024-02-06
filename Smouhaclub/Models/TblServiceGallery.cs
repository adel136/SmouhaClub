using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("Tbl_ServiceGallery")]
public partial class TblServiceGallery
{
    [Key]
    public int ServicGalleryId { get; set; }

    [Column("ServiceID")]
    public int? ServiceId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? ServicGalleryPhoto { get; set; }
}
