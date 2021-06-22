class GlobalHelper {
    constructor() {
        // throw new Error('Use Singleton.getInstance()');
        this.state = {};
    }


    // static getInstance() {
    //     if (!GlobalHelper.instance) {
    //         GlobalHelper.instance = new Helper();
    //     }
    //     return GlobalHelper.instance;
    // }
}

module.exports = new GlobalHelper();