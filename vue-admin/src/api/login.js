import service from '@/utils/request'
/**
 * 获取验证码
 */
export function GetSms(data){
    return service.request({
        method: 'post',
        url: '/flowinfo/statistics',
        data: data
        });
        // method: 'get',
        // url: '/deviceinfo/statistics'
        // });
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
}

 /**
  * 直接登录
  */

/**
 * 获取权限
 */