_is_selected = function(tags, slug) {
    var ref;
    return (ref = _.find(tags, {
        slug: slug
    })) != null ? ref.selected : void 0;
};
