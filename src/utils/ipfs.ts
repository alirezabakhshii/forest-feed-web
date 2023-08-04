export interface IPFSUploadResponse {
  Hash: string;
  Name: string;
  Size: number;
}

export async function upload(url: string, uri: string | File, type = 'image/jpg'): Promise<IPFSUploadResponse> {
  const formData = new FormData();

  if (uri instanceof File) {
    formData.append('file', uri);
    const response = await callUploadEndpoint(url, formData, false);

    return response.json();
  } else if (typeof uri === 'string') {
    const fileNameMatch = uri.match(/[^\\/]+$/);
    let fileName = 'file.jpg';
    if (fileNameMatch) {
      fileName = fileNameMatch[1];
    }

    formData.append('file', {
      uri,
      type,
      name: fileName,
    } as any);
    const response = await callUploadEndpoint(url, formData, true);

    return response.json();
  } else {
    formData.append('file', uri);
    const response = await callUploadEndpoint(url, formData, false);

    return response.json();
  }
}

export async function uploadContent(url: string, content: string): Promise<IPFSUploadResponse> {
  const formData = new FormData();

  formData.append('file', content);

  const response = await callUploadEndpoint(url, formData, false);

  return response.json();
}

export function getHttpDownloadUrl(url: string, hash: string) {
  return `${url}/${hash}`;
}

function callUploadEndpoint(url: string, formData: FormData, setHeader: boolean) {
  return fetch(`${url}`, {
    method: 'POST',
    body: formData,
    headers: setHeader
      ? {
          'Content-Type': 'multipart/form-data',
        }
      : {},
  });
}
