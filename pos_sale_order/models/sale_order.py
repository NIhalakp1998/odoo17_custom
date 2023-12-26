# -*- coding: utf-8 -*-
from odoo import models, fields


class SaleOrder(models.Model):
    """new fields added to sale order form"""
    _inherit = "sale.order"

    create_from_pos = fields.Boolean(string="Created From POS")
    pos_session = fields.Char(string="POS Session")
