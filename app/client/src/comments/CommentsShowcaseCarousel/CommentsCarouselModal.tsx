import React from "react";
import ModalComponent from "components/designSystems/blueprint/ModalComponent";
import { Layers } from "constants/Layers";
import { useDispatch } from "react-redux";
import { hideCommentsIntroCarousel } from "actions/commentActions";
import AnalyticsUtil from "utils/AnalyticsUtil";

function ShowcaseCarouselModal({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  return (
    <ModalComponent
      bottom={25}
      canEscapeKeyClose
      canOutsideClickClose
      data-cy={"help-modal"}
      hasBackDrop={false}
      isOpen
      left={25}
      onClose={() => {
        dispatch(hideCommentsIntroCarousel());
        AnalyticsUtil.logEvent("COMMENTS_ONBOARDING_MODAL_DISMISSED");
      }}
      overlayClassName="comments-onboarding-carousel"
      portalClassName="comments-onboarding-carousel-portal"
      scrollContents
      width={325}
      zIndex={Layers.appComments}
    >
      {children}
    </ModalComponent>
  );
}

export default ShowcaseCarouselModal;
