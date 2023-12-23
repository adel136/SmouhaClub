using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("tbl_NewsGallery")]
public partial class TblNewsGallery
{
    [Key]
    public int NewGalleryId { get; set; }

    public int? NewsId { get; set; }

    [StringLength(150)]
    [Unicode(false)]
    public string? NewGalleryImage { get; set; }
}
