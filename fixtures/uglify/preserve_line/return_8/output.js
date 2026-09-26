_is_selected = function(e, l) {
    var n;


    return null != (n = _.find(e, {
        slug: l
    })) ? n.selected : void 0;
};
