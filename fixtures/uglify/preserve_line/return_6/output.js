_is_selected = function(tags, slug) {
    var ref;


    return null != (ref = _.find(tags, {
        slug: slug
    })) ? ref.selected : void 0;
};
