

class DeferUtil {
    private renderResolveHandler: Function | undefined

    waitMounted() {
        return new Promise(resolve => {
            this.renderResolveHandler = resolve
        })
    }

    resolvedRender() {
        if (this.renderResolveHandler) {
            this.renderResolveHandler()
        }
    }
}

export const deferUtil = new DeferUtil()