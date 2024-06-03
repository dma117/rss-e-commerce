import styles from './style.module.css';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { getUserInfo } from '@/utils/api/commercetools-api';
import { Address, Customer } from '@commercetools/platform-sdk';

const Profile: FC = () => {
  const { apiRoot } = useApiRootContext();
  const [userInfo, setUserInfo] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (apiRoot) {
        const data = await getUserInfo(apiRoot);
        if (data) setUserInfo(data);
      }
    };
    fetchUserInfo();
  }, [apiRoot]);

  const foundAddress = (id: string | undefined) => {
    if (!id) return;
    return userInfo?.addresses.find((address) => address.id === id);
  };
  const getAddress = (address: Address | undefined) => {
    if (!address) return;
    return `${address.country}, ${address.city}, ${address.streetName}, ${address.postalCode}`;
  };

  return (
    <div className={cn('container', styles.profileContainer)}>
      <div className={styles.infoBlock}>
        <h2 className={styles.title}>Personal Information</h2>
        <div className={styles.dataBlock}>
          <div className={styles.data}>
            <span className={styles.label}>Email:</span>
            <span className={styles.dataItem}>{userInfo?.email}</span>
          </div>
          <div className={styles.data}>
            <span className={styles.label}>First Name:</span>
            <span className={styles.dataItem}>{userInfo?.firstName}</span>
          </div>
          <div className={styles.data}>
            <span className={styles.label}>Last Name:</span>
            <span className={styles.dataItem}>{userInfo?.lastName}</span>
          </div>
          <div className={styles.data}>
            <span className={styles.label}>Date of birth:</span>
            <span className={styles.dataItem}>{userInfo?.dateOfBirth}</span>
          </div>
        </div>
        <button className={styles.btn} onClick={() => {}}>
          Change personal data
        </button>
      </div>
      <div className={styles.infoBlock}>
        <h2 className={styles.title}>Addresses</h2>
        <div className={styles.dataBlock}>
          <span className={styles.label}>All Addresses: </span>
          <ul className={styles.addressList}>
            {userInfo?.addresses.map((address) => (
              <li className={styles.addressItem} key={address.id}>
                {getAddress(address)}
              </li>
            ))}
          </ul>
          <div className={styles.data}>
            <span className={styles.label}>Default shipping address:</span>
            <span className={styles.dataItem}>
              {getAddress(foundAddress(userInfo?.defaultShippingAddressId))}
            </span>
          </div>
          <div className={styles.data}>
            <span className={styles.label}>Default billing address:</span>
            <span className={styles.dataItem}>
              {getAddress(foundAddress(userInfo?.defaultBillingAddressId))}
            </span>
          </div>
        </div>
        <button onClick={() => {}} className={styles.btn}>
          Change Addresses
        </button>
      </div>
      <div className={styles.infoBlock}>
        <h2 className={styles.title}>Password</h2>
        <button className={styles.btn}>Change Password</button>
      </div>
    </div>
  );
};

export default Profile;
