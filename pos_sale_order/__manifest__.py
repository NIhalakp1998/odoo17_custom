# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


{
    'name': 'POS Sale Orders',
    'version': '17.0.1.1.1',
    'category': 'Sales/Point of Sale',
    'sequence': 6,
    'summary': 'Create Sale order from POS',
    'description': """Create sale order from POS""",
    'depends': ['base', 'point_of_sale'],
    'data': [
        'views/pos_config_view.xml',
        'views/pos_session_smart_view.xml',
        'views/sale_order_view.xml',

    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_sale_order/static/src/xml/pos_create_button.xml',
            'pos_sale_order/static/src/xml/sale_popup.xml',
            'pos_sale_order/static/src/js/pos_popup.js',
            'pos_sale_order/static/src/js/pos_button.js',

        ],
    },
    'installable': True,
    'license': 'LGPL-3',
}
