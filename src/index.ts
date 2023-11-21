class RequestError extends Error {
  status: number
  message: string
  constructor(message: string, status: number) {
    super()
    this.status = status
    this.message = message
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type ApiResponse<T> = {
  data?: T
  error?: string
  status?: number
}

type ApiOptions<T> = {
  url: string
  method: HttpMethod
  data?: T | Partial<T>
  headers?: Record<string, string>
}

type NestedRoutes<T> = {
  [K in keyof T]?: string
}

async function makeApiRequest<T>(
  options: ApiOptions<T>,
): Promise<ApiResponse<T>> {
  try {
    const { url, method, data } = options
    console.log(process.env.REACT_APP_HTTP_SERVER_URL)
    const response = await fetch(process.env.REACT_APP_HTTP_SERVER_URL + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    })

    const status = response.status
    const body = await response.json()
    if (status > 203) {
      throw new RequestError(body.error, status)
    }

    return { data: body, status }
  } catch (error: any) {
    return {
      error: error.message || 'An error occurred',
      status: error.status,
    }
  }
}

function generateNestedUrl<T>(
  baseUrl: string,
  nestedRoutes: NestedRoutes<T>,
): string {
  let nestedUrl = baseUrl

  for (const key in nestedRoutes) {
    if (nestedRoutes.hasOwnProperty.call(key, nestedUrl)) {
      const route = nestedRoutes[key]
      nestedUrl += `/${key}/${route}`
    }
  }

  return nestedUrl
}

async function post<T>(
  baseUrl: string,
  nestedRoutes: NestedRoutes<T>,
  data: T,
): Promise<ApiResponse<T>> {
  const url = generateNestedUrl(baseUrl, nestedRoutes)
  return await makeApiRequest<T>({ url, method: 'POST', data })
}

async function put<T>(
  baseUrl: string,
  nestedRoutes: NestedRoutes<T>,
  data: T | Partial<T>,
): Promise<ApiResponse<T>> {
  const url = generateNestedUrl(baseUrl, nestedRoutes)
  return await makeApiRequest<T>({ url, method: 'PUT', data })
}

async function patch<T>(
  baseUrl: string,
  nestedRoutes: NestedRoutes<T>,
  data: Partial<T>,
): Promise<ApiResponse<T>> {
  const url = generateNestedUrl(baseUrl, nestedRoutes)
  return await makeApiRequest<T>({ url, method: 'PATCH', data })
}

async function get<T>(
  baseUrl: string,
  nestedRoutes: NestedRoutes<T> = {},
): Promise<ApiResponse<T>> {
  const url = generateNestedUrl(baseUrl, nestedRoutes)
  return await makeApiRequest<T>({ url, method: 'GET' })
}

async function del<T>(
  baseUrl: string,
  nestedRoutes: NestedRoutes<T>,
): Promise<ApiResponse<void>> {
  const url = generateNestedUrl(baseUrl, nestedRoutes)
  return await makeApiRequest<void>({ url, method: 'DELETE' })
}

export { del, get, patch, post, put }
