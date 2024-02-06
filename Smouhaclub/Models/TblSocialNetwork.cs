using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("tbl_SocailNetwork")]
public class TblSocialNetwork
{
    [Key]
    public int SocialNetworkID { get; set; }

    [StringLength(500)]
    public string? SocialIcon { get; set; }

    [StringLength(150)]
    [Unicode(false)]
    public string? SocialLink { get; set; }

    public bool? IsShowable { get; set; }
}
