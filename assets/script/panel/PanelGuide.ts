import { MPanel, MPanelExtends } from "../framework/MPanel";

const { ccclass, property, menu } = cc._decorator;
interface OpenParams {
    world_position: cc.Vec2
    info: string
}
interface CloseParams { }

/**
 * [Panel] Guide+system
 */
@ccclass
@menu("panel/PanelGuide")
export class PanelGuide extends MPanelExtends {

    static config = {
        open_type: <"chain">"chain",
        open_params: <OpenParams>{},
        close_params: <CloseParams>{},
    }

    async on_open(params: OpenParams) {
        this.arrow_point.position = this.arrow_point.parent.convertToNodeSpaceAR(params.world_position)
        this.label_info.string = params.info
        MPanel.in_fade_move(this.arrow_point, "down")
        await MPanel.in_move(this.bg_info, "down")
        cc.director.pause()
    }

    async on_close() {
        cc.director.resume()
        MPanel.out_fade_move(this.arrow_point, "up")
        await MPanel.out_move(this.bg_info, "down")
    }

    @property(cc.Node)
    bg_info: cc.Node = null

    @property(cc.Label)
    label_info: cc.Label = null

    @property(cc.Node)
    arrow_point: cc.Node = null

    /** click event close */
    event_close() {
        MPanel.close(PanelGuide)
    }
}
