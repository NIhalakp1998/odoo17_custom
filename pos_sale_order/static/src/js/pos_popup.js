/** @odoo-module **/

import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import {ErrorPopup} from "@point_of_sale/app/errors/popups/error_popup";
import { useRef,useState } from "@odoo/owl";

export class CreateSale extends AbstractAwaitablePopup {
    static template = "pos_sale_order.CreateSale";
    static defaultProps = {
        confirmText: _t("Create Order"),
        title: _t("Error"),
        cancelKey: _t("cancel"),
        sound: true,
    };

    setup(){
        this.orm = useService("orm");
        this.popup = useService("popup");
        this.state = useRef("state");
        this.sale = useState({
            order_id :null,
            }
        )
    }
//    ---------------------------------------------------------
    async confirm_order(){
    var self=this
    await self.create_sale()
    }
//     --------------to create sale order from pos-----------------------------------------

    create_sale(){
        var self = this
        const order_id = this.props.pos.get_order()
        const orderlines = order_id.orderlines
        console.log('lll',orderlines,'lll')
        const order_details = {
             partner_id : order_id.partner.id,
             state : this.state.el.value,
             create_from_pos:true,
             pos_session : order_id.pos.pos_session.name
            }
        const create_sale_order = this.orm.call("sale.order",'create',[order_details]).then( async (result)=>{
            self.sale.order_id = result
            for(const order in orderlines){
                const order_lines = orderlines[order]
                console.log("order_lines",order_lines)
                const order_line = {
                order_id: self.sale.order_id,
                product_id : order_lines.product.id,
                product_uom_qty : order_lines.quantity,
                name : order_lines.product.display_name,
                price_unit : order_lines.product.lst_price,
                }
                const create_sale_order_line = await this.orm.call("sale.order.line",'create',[order_line])
                super.confirm()

        };
        })

    }
    }


