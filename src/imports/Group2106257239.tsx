import imgInformationEGovernmentAuthority from "figma:asset/f605a5e591189376365a30f4b95cd45df42b30e8.png";
import imgSurveyAndLandRegistrationBureau from "figma:asset/727daca89e21026342142442add6c9766c555cbb.png";
import imgSocialInsuranceOrganization from "figma:asset/f1c6e9c2249bcaeb1e3018078696afc3cfcf52d0.png";
import imgTenderBoard from "figma:asset/01f965fdea88f9f7d0cced4e43fd8e495d4ffef2.png";
import imgMinistryOfForeignAffairs from "figma:asset/f19352d4f262cdb0f5fc7260253177e0bfaae583.png";
import imgMinistryOfIndustryAndCommerce from "figma:asset/d0a3949086d392f40ff1edc155daf8aa8b1bcd3b.png";
import imgMinistryOfTransportationAndTelecommunications from "figma:asset/d6aa7287fb342a673e97a0e070843e01698abdc2.png";
import imgMinistryOfInterior from "figma:asset/8f93324345cc3e00b8122973bbc8251a16de98d9.png";

function DivCardImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[4px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="max-w-[260px] relative rounded-[13px] shrink-0 size-[200px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[13px]">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-[244px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative w-full">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <a href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity" className="bg-white cursor-pointer flex-[1_0_0] min-h-px min-w-px relative rounded-[13px] w-full">
      <div aria-hidden="true" className="absolute border-2 border-[#d3d3da] border-solid inset-0 pointer-events-none rounded-[13px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[37px] pt-[18px] px-[7px] relative size-full">{children}</div>
      </div>
    </a>
  );
}

function H5CardText({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper1>
      <div className="cursor-pointer flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#17171c] text-[15.6px] text-center whitespace-nowrap" role="link" tabIndex="0">
        {children}
      </div>
    </Wrapper1>
  );
}
type H5CardTextTextProps = {
  text: string;
};

function H5CardTextText({ text }: H5CardTextTextProps) {
  return (
    <Wrapper1>
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#17171c] text-[16px] text-center whitespace-nowrap" role="link" tabIndex="0">
        <p className="cursor-pointer leading-[24px]">{text}</p>
      </div>
    </Wrapper1>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute content-stretch flex flex-col gap-[19.19px] items-start left-0 right-0 top-0" data-name="header.section__head">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="h3">
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0747c7] text-[24px] w-full">
            <p className="leading-[24px]">eServices provided by</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p">
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#17171c] text-[19px] w-full">
            <p className="leading-[25.27px]">Find eServices by their providing entities</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[646px] left-0 right-0 top-[100.05px]" data-name="section__head">
        <div className="absolute content-stretch flex flex-col inset-[0_870px_323px_0] items-start justify-center max-w-[1160px] pb-[16px] px-[8px]" data-name="div.col-6:margin">
          <Wrapper>
            <DivCardImage>
              <Wrapper2>
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgInformationEGovernmentAuthority} />
              </Wrapper2>
            </DivCardImage>
            <H5CardText>
              <p className="mb-0">{`Information & eGovernment`}</p>
              <p>Authority</p>
            </H5CardText>
          </Wrapper>
        </div>
        <div className="absolute content-stretch flex flex-col inset-[0_580px_323px_290px] items-start justify-center max-w-[1160px] pb-[16px] px-[8px]" data-name="col-6 col-md-4 col-lg-3 col-xl-2:margin">
          <Wrapper>
            <DivCardImage>
              <Wrapper2>
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSurveyAndLandRegistrationBureau} />
              </Wrapper2>
            </DivCardImage>
            <Wrapper1>
              <div className="cursor-pointer flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#17171c] text-[16px] text-center whitespace-nowrap" role="link" tabIndex="0">
                <p className="mb-0">Survey and Land Registration</p>
                <p>Bureau</p>
              </div>
            </Wrapper1>
          </Wrapper>
        </div>
        <div className="absolute content-stretch flex flex-col inset-[0_290px_323px_580px] items-start justify-center max-w-[1160px] pb-[16px] px-[8px]" data-name="col-6 col-md-4 col-lg-3 col-xl-2:margin">
          <Wrapper>
            <DivCardImage>
              <Wrapper2>
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSocialInsuranceOrganization} />
              </Wrapper2>
            </DivCardImage>
            <H5CardTextText text="Social Insurance Organization" />
          </Wrapper>
        </div>
        <div className="absolute content-stretch flex flex-col inset-[0_0_323px_870px] items-start justify-center max-w-[1160px] pb-[16px] px-[8px]" data-name="col-6 col-md-4 col-lg-3 col-xl-2:margin">
          <Wrapper>
            <DivCardImage>
              <Wrapper2>
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTenderBoard} />
              </Wrapper2>
            </DivCardImage>
            <H5CardTextText text="Tender Board" />
          </Wrapper>
        </div>
        <div className="absolute content-stretch flex flex-col inset-[323px_870px_0_0] items-start justify-center max-w-[1160px] pb-[16px] px-[8px]" data-name="col-6 col-md-4 col-lg-3 col-xl-2:margin">
          <Wrapper>
            <DivCardImage>
              <Wrapper2>
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMinistryOfForeignAffairs} />
              </Wrapper2>
            </DivCardImage>
            <Wrapper1>
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#17171c] text-[15.9px] text-center whitespace-nowrap" role="link" tabIndex="0">
                <p className="cursor-pointer leading-[24px]">Ministry of Foreign Affairs</p>
              </div>
            </Wrapper1>
          </Wrapper>
        </div>
        <div className="absolute content-stretch flex flex-col inset-[323px_580px_0_290px] items-start justify-center max-w-[1160px] pb-[16px] px-[8px]" data-name="col-6 col-md-4 col-lg-3 col-xl-2:margin">
          <Wrapper>
            <DivCardImage>
              <Wrapper2>
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMinistryOfIndustryAndCommerce} />
              </Wrapper2>
            </DivCardImage>
            <H5CardText>
              <p className="mb-0">Ministry of Industry and</p>
              <p>Commerce</p>
            </H5CardText>
          </Wrapper>
        </div>
        <div className="absolute content-stretch flex flex-col inset-[323px_290px_0_580px] items-start justify-center max-w-[1160px] pb-[16px] px-[8px]" data-name="col-6 col-md-4 col-lg-3 col-xl-2:margin">
          <Wrapper>
            <DivCardImage>
              <Wrapper2>
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMinistryOfTransportationAndTelecommunications} />
              </Wrapper2>
            </DivCardImage>
            <Wrapper1>
              <div className="cursor-pointer flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#17171c] text-[15.8px] text-center whitespace-nowrap" role="link" tabIndex="0">
                <p className="mb-0">Ministry of Transportation and</p>
                <p>Telecommunications</p>
              </div>
            </Wrapper1>
          </Wrapper>
        </div>
        <div className="absolute content-stretch flex flex-col inset-[323px_0_0_870px] items-start justify-center max-w-[1160px] pb-[16px] px-[8px]" data-name="col-6 col-md-4 col-lg-3 col-xl-2:margin">
          <Wrapper>
            <DivCardImage>
              <Wrapper2>
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMinistryOfInterior} />
              </Wrapper2>
            </DivCardImage>
            <Wrapper1>
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#17171c] text-[15.5px] text-center whitespace-nowrap" role="link" tabIndex="0">
                <p className="cursor-pointer leading-[24px]">Ministry of Interior</p>
              </div>
            </Wrapper1>
          </Wrapper>
        </div>
      </div>
      <div className="absolute bg-[#0747c7] left-[381.5px] max-w-[397px] min-w-[343px] right-[381.5px] rounded-[8px] top-[761.05px]" data-name="Component 2">
        <div className="flex flex-col items-center max-w-[inherit] min-w-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center max-w-[inherit] min-w-[inherit] p-[16px] relative w-full">
            <a className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService">
              <p className="cursor-pointer leading-[24px]">View all eService categories</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}