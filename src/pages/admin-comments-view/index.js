import React from 'react';

const AdminCommentsView = (selectedPost) => {
    return (
        <div className={styles["rejection-comment-container"]}>
            <div
              className={styles["rejection-comment-container-outer-border"]}
            />
            <div
              className={styles["rejection-comment-container-top-divider"]}
            />
            <div className={styles["rejection-comment-title-text"]}>
              {`Admin Comment on ${convertTimeFormatHMDY(latestReviewTime)}`}
            </div>
            <div className={styles["rejection-comment-content-text"]}>
              {adminComment.at(-1).comment}
            </div>
          </div>
    );
};

export default AdminCommentsView;