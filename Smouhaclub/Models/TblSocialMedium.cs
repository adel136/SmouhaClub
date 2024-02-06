using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("Tbl_SocialMedia")]
public partial class TblSocialMedium
{
    [Key]
    [Column("SocialMediaID")]
    public int SocialMediaId { get; set; }

    [StringLength(500)]
    [Unicode(false)]
    public string? SocialIcon { get; set; }

    [StringLength(500)]
    [Unicode(false)]
    public string? SocialLink { get; set; }

    public bool? IsShowable { get; set; }
}
