export const backendOrigin='https://tokyo-christmas-rimi.grimmpark.chatgpt.site';
export function isGitHubPages(){return typeof window!=='undefined'&&window.location.hostname==='provedcat.github.io'}
export function apiPath(path:string){return isGitHubPages()?backendOrigin+path:path}
export function assetBase(){return isGitHubPages()?'/wintertokyo/':'/'}
