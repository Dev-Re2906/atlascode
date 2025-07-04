import {
    authenticateButtonEvent,
    authenticatedEvent,
    bbIssuesPaginationEvent,
    customJQLCreatedEvent,
    deepLinkEvent,
    DeepLinkEventErrorType,
    doneButtonEvent,
    exploreFeaturesButtonEvent,
    externalLinkEvent,
    featureChangeEvent,
    focusCreateIssueEvent,
    focusCreatePullRequestEvent,
    focusIssueEvent,
    focusPullRequestEvent,
    installedEvent,
    issueCommentEvent,
    issueCreatedEvent,
    issueTransitionedEvent,
    issueUpdatedEvent,
    issueUrlCopiedEvent,
    issueWorkStartedEvent,
    launchedEvent,
    loggedOutEvent,
    logoutButtonEvent,
    moreSettingsButtonEvent,
    openSettingsButtonEvent,
    pipelineRerunEvent,
    pipelineStartEvent,
    pmfClosed,
    pmfSnoozed,
    pmfSubmitted,
    prApproveEvent,
    prCheckoutEvent,
    prCommentEvent,
    prCreatedEvent,
    prMergeEvent,
    prPaginationEvent,
    prTaskEvent,
    prUrlCopiedEvent,
    saveManualCodeEvent,
    startIssueCreationEvent,
    uiErrorEvent,
    upgradedEvent,
    viewScreenEvent,
} from './analytics';
import { AnalyticsClient } from './analytics-node-client/src/client.min.js';
import { UIErrorInfo } from './analyticsTypes';
import { DetailedSiteInfo, Product, SiteInfo } from './atlclients/authInfo';
import { AnalyticsApi } from './lib/analyticsApi';

export class VSCAnalyticsApi implements AnalyticsApi {
    private _analyticsClient: AnalyticsClient;
    private _isRemote: boolean;
    private _isWebUI: boolean;

    constructor(analyticsClient: AnalyticsClient, isRemote: boolean, isWebUI: boolean) {
        this._analyticsClient = analyticsClient;
        this._isRemote = isRemote;
        this._isWebUI = isWebUI;
    }

    public async fireInstalledEvent(version: string): Promise<void> {
        return installedEvent(version).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireUpgradedEvent(version: string, previousVersion: string): Promise<void> {
        return upgradedEvent(version, previousVersion).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireLaunchedEvent(
        location: string,
        ideUriScheme: string,
        numJiraCloudAuthed: number,
        numJiraDcAuthed: number,
        numBitbucketCloudAuthed: number,
        numBitbucketDcAuthed: number,
    ): Promise<void> {
        return launchedEvent(
            location,
            ideUriScheme,
            numJiraCloudAuthed,
            numJiraDcAuthed,
            numBitbucketCloudAuthed,
            numBitbucketDcAuthed,
        ).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireFeatureChangeEvent(featureId: string, enabled: boolean): Promise<void> {
        return featureChangeEvent(featureId, enabled).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireAuthenticatedEvent(site: DetailedSiteInfo, isOnboarding?: boolean): Promise<void> {
        return authenticatedEvent(site, isOnboarding).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireLoggedOutEvent(site: DetailedSiteInfo): Promise<void> {
        return loggedOutEvent(site).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireIssueCreatedEvent(site: DetailedSiteInfo, issueKey: string): Promise<void> {
        return issueCreatedEvent(site, issueKey).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireIssueTransitionedEvent(site: DetailedSiteInfo, issueKey: string): Promise<void> {
        return issueTransitionedEvent(site, issueKey).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireIssueUrlCopiedEvent(): Promise<void> {
        return issueUrlCopiedEvent().then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireIssueCommentEvent(site: DetailedSiteInfo): Promise<void> {
        return issueCommentEvent(site).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireIssueWorkStartedEvent(site: DetailedSiteInfo, pushBranchToRemoteChecked: boolean): Promise<void> {
        return issueWorkStartedEvent(site, pushBranchToRemoteChecked).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireIssueUpdatedEvent(
        site: DetailedSiteInfo,
        issueKey: string,
        fieldName: string,
        fieldKey: string,
    ): Promise<void> {
        return issueUpdatedEvent(site, issueKey, fieldName, fieldKey).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireStartIssueCreationEvent(source: string, product: Product): Promise<void> {
        return startIssueCreationEvent(source, product).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePrCreatedEvent(site: DetailedSiteInfo): Promise<void> {
        return prCreatedEvent(site).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePrCommentEvent(site: DetailedSiteInfo): Promise<void> {
        return prCommentEvent(site).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePrTaskEvent(site: DetailedSiteInfo, commentId?: string): Promise<void> {
        return prTaskEvent(site, commentId ? 'comment' : 'prlevel').then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePrCheckoutEvent(site: DetailedSiteInfo): Promise<void> {
        return prCheckoutEvent(site).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePrApproveEvent(site: DetailedSiteInfo): Promise<void> {
        return prApproveEvent(site).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePrMergeEvent(site: DetailedSiteInfo): Promise<void> {
        return prMergeEvent(site).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePrUrlCopiedEvent(): Promise<void> {
        return prUrlCopiedEvent().then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireCustomJQLCreatedEvent(site: DetailedSiteInfo): Promise<void> {
        return customJQLCreatedEvent(site).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePipelineStartEvent(site: DetailedSiteInfo): Promise<void> {
        return pipelineStartEvent(site).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePmfSubmitted(level: string): Promise<void> {
        return pmfSubmitted(level).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePmfSnoozed(): Promise<void> {
        return pmfSnoozed().then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async firePmfClosed(): Promise<void> {
        return pmfClosed().then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireDeepLinkEvent(source: string, target: string, errorType: DeepLinkEventErrorType): Promise<void> {
        return deepLinkEvent(source, target, errorType).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireExternalLinkEvent(source: string, linkId: string): Promise<void> {
        return externalLinkEvent(source, linkId).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireViewScreenEvent(screenName: string, site?: DetailedSiteInfo, product?: Product): Promise<void> {
        return viewScreenEvent(screenName, site, product).then((e) => {
            this._analyticsClient.sendScreenEvent(e);
        });
    }

    public async fireBBIssuesPaginationEvent(): Promise<void> {
        return bbIssuesPaginationEvent().then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async firePrPaginationEvent(): Promise<void> {
        return prPaginationEvent().then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireMoreSettingsButtonEvent(source: string): Promise<void> {
        return moreSettingsButtonEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireDoneButtonEvent(source: string): Promise<void> {
        return doneButtonEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireFocusCreateIssueEvent(source: string): Promise<void> {
        return focusCreateIssueEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireFocusIssueEvent(source: string): Promise<void> {
        return focusIssueEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireFocusCreatePullRequestEvent(source: string): Promise<void> {
        return focusCreatePullRequestEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireFocusPullRequestEvent(source: string): Promise<void> {
        return focusPullRequestEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireAuthenticateButtonEvent(source: string, site: SiteInfo, isCloud: boolean): Promise<void> {
        return authenticateButtonEvent(source, site, isCloud, this._isRemote, this._isWebUI).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireLogoutButtonEvent(source: string): Promise<void> {
        return logoutButtonEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireSaveManualCodeEvent(source: string): Promise<void> {
        return saveManualCodeEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireOpenSettingsButtonEvent(source: string): Promise<void> {
        return openSettingsButtonEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async fireExploreFeaturesButtonEvent(source: string): Promise<void> {
        return exploreFeaturesButtonEvent(source).then((e) => {
            this._analyticsClient.sendUIEvent(e);
        });
    }

    public async firePipelineRerunEvent(site: DetailedSiteInfo, source: string) {
        return pipelineRerunEvent(site, source).then((e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }

    public async fireUIErrorEvent(errorInfo: UIErrorInfo) {
        return uiErrorEvent(errorInfo).then(async (e) => {
            this._analyticsClient.sendTrackEvent(e);
        });
    }
}
