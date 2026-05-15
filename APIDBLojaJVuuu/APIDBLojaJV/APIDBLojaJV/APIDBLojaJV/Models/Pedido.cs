using System;
using System.Collections.Generic;

namespace APIDBLojaJV.Models;

public partial class Pedido
{
    public int IdP { get; set; }

    public string Descricao { get; set; } = null!;

    public decimal Preco { get; set; }

    public int? IdC { get; set; }

    public virtual Cliente? IdCNavigation { get; set; }
}
