export const postResolver = {
	poster: (parent, _params, ctx) => ctx.posterLoader.load(parent.poster),
};
