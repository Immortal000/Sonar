export const addPostToPosts = async () => {
  let postsInfo;
  postsStore.subscribe((value) => {
    postsInfo = value.postsInfo;
  });

  postsStore.update((current) => {
    return {
      ...current,
      postsInfo: [...postsInfo, postSchema],
    };
  });
};

export const check_validity = async () => {};
